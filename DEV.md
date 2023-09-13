## Spec CLI Common Commands


Show the structure of the event data
```bash
$ spec tail allov2.Allo.PoolFunded
```

Your local postgres table will keep all of its data and just subscribe to new incoming events
```bash
$ spec test object Profile
```
BUT, if you run the objects over historical data, spec will wipe your local table before each run unless explicitly given the --keep-data flag
```bash
$ spec test object Profile --keep-data
```

Last 30 days of event data
```bash
spec test object Profile --recent
```

Pull everything
```bash
$ spec test object Profile --all-time
```

See registered events
```bash
spec get events allov2.RFPSimple
```