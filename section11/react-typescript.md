# TypeScript React
## creat-react-app 
creat-react-appでtypescriptを使う方法.
```
    npx create-react-app my-app --template typescript
```

## 親コンポーネントからpropsを渡す方法
propsに型を定義する必要がある。型はtypeでもinterfaceでもどちらでも良い。

```TypeScript
    //hello.tsx
    import React from 'react';
    type HelloProps = {
        message: string;
    }

    const Hello = (props: HelloProps) => {
    return <h1>Hello {props.message}</h1>
    }

    export default Hello;
```
```TypeScript
    //app.tsx
    import React from 'react';
    import Hello from './components/Hello'
    function App() {
    return (
        <div>
        <Hello message="i am peter"></Hello>
        </div>
    );
    }

    export default App;cd

```