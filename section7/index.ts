function Logging(message: string) {
    return function (target: Function) {
        console.log(message);
        console.log(target);
    }
}

function Component(template: string,selector: string) {
    return function<T extends { new(...args: any[]): {name: string } }> (constructor: T) { 

        return class extends constructor{ //このconstructorは自らが持っているプロパティを把握できない
            constructor(...args: any[]){
                super(...args);
                console.log('Component');
                const mountedElement = document.querySelector(selector);
                const instance = new constructor(31);    
                if (mountedElement) {
                    mountedElement.innerHTML = template;
                    mountedElement.querySelector('h1')!.textContent = instance.name
                }
            }
        }
    }

}

function PropertyLogging(target: any,propertyKey: string) {
    console.log()
    console.log(target)
    console.log(propertyKey)
}

function MethodLogging(target: any,propertyKey: string,descriptor: PropertyDescriptor) {
    console.log()
    console.log(target)
    console.log(propertyKey)
    console.log(descriptor)
}

@Component('<h1>{{ name }}</h1>','#app')
@Logging('Logging')
class User {
    name ='quill';
    age= 32;    
    constructor(age: number){
        console.log('User was created!');
    }
}

// const user1 = new User();
