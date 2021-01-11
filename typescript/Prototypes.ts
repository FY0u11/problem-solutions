interface Person {
    name: string
    sayHello (): void
}

const Person = function (this: Person, name: string) {
    this.name = name
} as any as { new (name: string): Person }

Person.prototype.sayHello = function () {
    console.log(`Hi, my name is ${this.name}`)
}

interface Developer extends Person {
    writeCode (): void
}

const Developer = function (this: Developer, name: string): void {
    Person.call(this, name)
} as any as { new (name: string): Developer }

Developer.prototype.writeCode = function () {
    console.log(this.name, 'writes code')
}

Object.setPrototypeOf(Developer.prototype, Person.prototype)

const person = new Person('John')
person.sayHello()
const dev = new Developer('Snow')
dev.sayHello()
dev.writeCode()
