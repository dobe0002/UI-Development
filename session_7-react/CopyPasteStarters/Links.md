Create react app:
## Create react app

Install:
```
npx create-react-app ipsum_app
```

Website: https://create-react-app.dev/


Dev server: `npm run start`

## Eject configs

```
npm run eject
```


## Reactstrap

Website: https://reactstrap.github.io/

```
npm install --save reactstrap react react-dom
```


## Get data method:
```
async loadIpsum(type, paragraphs = 3) {
    let url = `https://baconipsum.com/api/?type=all-meat&paras=${paragraphs}`;
    if (type === 'pony') {
      url = `https://ponyipsum.com/api/?type=all-pony&paras=${paragraphs}`;
    }
    const data = await axios.get(url);
    setTimeout(() => {
      


    }, 3000);
  }
  ```