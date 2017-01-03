# Isomorphic app benchmarks

**For isomorphic benchmarks**

```
ISOMORPHIC=true npm run prod
```

**For client-only benchmarks**

```
npm run prod
```

After compiling go to `localhost:8000/test`.

Then after redirect occurs, check console for timing logs.

> All times are relative to the time when **the initial request** to
> `localhost:8000/` was made
