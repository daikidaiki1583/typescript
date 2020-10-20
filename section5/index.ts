interface Engineer {
    name: string,
    role: string
}

interface Blogger {
    name: string,
    follower: number
}

type EngineerBlogger = Engineer & Blogger;
interface EngineerBlogger2 extends Engineer,Blogger {}

type NumberBoolean = number | boolean;
type StringNumbar = string | number;
type Mix = NumberBoolean & StringNumbar; 

type NomadWorker = Engineer | Blogger;
function describeProfile(nomadWorker: NomadWorker){
    console.log(nomadWorker.name);
    if (`role` in nomadWorker) {
        console.log(nomadWorker.role)
    }
}

class Dog {
    kind: 'dog' = 'dog'
    speak(){
        console.log('bow')
    }
}

class Bird {
    kind: 'bird' = 'bird'
    speak() {
        console.log('twee')
    }
    fly() {
        console.log('patapta')
    }
}

type Pet = Dog | Bird;
function havepet(pet: Pet){
        pet.speak();
        switch (pet.kind) {
            case 'bird':
                pet.fly()
        }
    if (pet instanceof Bird){
        pet.fly();
    }

}


const input = document.getElementById('input') ;

interface Designer {
    name: string;
    [index: string]: string;
}

const designer: Designer = {
    name:'Quill',
    role:'web'
}

function toUpperCase(x: string): string;
function toUpperCase(x: number): number;
function toUpperCase(x: string | number) {
    if (typeof x === 'string') {
        return x.toUpperCase();
    }
    return x;
} 

const upperHello = toUpperCase('hello')

interface DownloadedData {
    id: number;
    user?: {
        name?: {
            first: string;
            last: string;
        }
    }
}
const downloadedData: DownloadedData = {
    id: 1
}

console.log(downloadedData.user.name)
const  userData = downloadedData.user ?? 'no-user';
type id = DownloadedData['id']
const test: id = 3231;

let target = function (a: string, b?: string) {}
let source = function (a: string) {}
source　= target; //targetにsourceを代入
    
interface FuncA {
    (a: number,b: string): number;
}
interface FuncB {
    (a: string): string;
}

let unionFunc: FuncA | FuncB;
unionFunc =function (a: string) {return 'hi'}
unionFunc("sa")
unionFunc =function (a: number) {return 21}
unionFunc(1,"sa")

const Peter = {
    name: 'Peter',
    age: 38
} 

type PeterType = typeof Peter; 