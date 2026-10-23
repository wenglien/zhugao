#!/usr/bin/env python3
"""List recent 築稿 error reports from Firestore, grouped by message, and delete reports older than 30 days.

Uses your gcloud login: run `gcloud auth login` once, then `python3 scripts/errors.py [days]`.
The privacy policy promises reports are kept at most 30 days; Firestore TTL needs the Blaze plan, so run this at least monthly.
"""
import json, subprocess, sys, time, urllib.request
from collections import Counter

PROJECT = 'zhugao-design'
days = float(sys.argv[1]) if len(sys.argv) > 1 else 7
token = subprocess.run(['gcloud', 'auth', 'print-access-token'], capture_output=True, text=True, check=True).stdout.strip()
query = {'structuredQuery': {
    'from': [{'collectionId': 'errlogs'}],
    'where': {'fieldFilter': {'field': {'fieldPath': 'ts'}, 'op': 'GREATER_THAN', 'value': {'integerValue': str(int((time.time() - days * 86400) * 1000))}}},
    'orderBy': [{'field': {'fieldPath': 'ts'}, 'direction': 'DESCENDING'}], 'limit': 500}}
req = urllib.request.Request(f'https://firestore.googleapis.com/v1/projects/{PROJECT}/databases/(default)/documents:runQuery',
                             data=json.dumps(query).encode(), headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'})
rows = [r['document']['fields'] for r in json.load(urllib.request.urlopen(req)) if 'document' in r]

# prune reports older than 30 days
old = {'structuredQuery': {'from': [{'collectionId': 'errlogs'}], 'where': {'fieldFilter': {'field': {'fieldPath': 'ts'}, 'op': 'LESS_THAN', 'value': {'integerValue': str(int((time.time() - 30 * 86400) * 1000))}}}, 'limit': 1000}}
oreq = urllib.request.Request(req.full_url, data=json.dumps(old).encode(), headers=req.headers)
stale = [r['document']['name'] for r in json.load(urllib.request.urlopen(oreq)) if 'document' in r]
for name in stale:
    urllib.request.urlopen(urllib.request.Request(f'https://firestore.googleapis.com/v1/{name}', method='DELETE', headers={'Authorization': f'Bearer {token}'}))
if stale: print(f'Deleted {len(stale)} reports older than 30 days.')
val = lambda f, k: next(iter(f.get(k, {'stringValue': ''}).values()))
if not rows:
    print(f'No error reports in the last {days:g} days.'); sys.exit()
groups = Counter(val(f, 'msg') for f in rows)
print(f'{len(rows)} reports in the last {days:g} days, {len(groups)} distinct errors\n')
for msg, n in groups.most_common():
    first = next(f for f in rows if val(f, 'msg') == msg)
    when = time.strftime('%m-%d %H:%M', time.localtime(int(val(first, 'ts')) / 1000))
    print(f'[{n}x] {msg}\n      latest {when}  v{val(first, "v")}  {val(first, "kind")}  tab={val(first, "tab")}  {val(first, "ua")[:80]}')
    stack = val(first, 'stack').strip().splitlines()
    for line in stack[:3]: print('      ' + line.strip())
    print()
