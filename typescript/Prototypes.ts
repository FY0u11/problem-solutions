interface Person {
    name: string
    sayHello (): void
}

const Person = function (this: Person, name: string) {
    this.name = name

    this.sayHello = function () {
        console.log(`Hi, my name is ${this.name}`)
    }
} as any as { new (name: string): Person }

interface Developer extends Person {
    writeCode (): void
}

const Developer = function (this: Developer, name: string): void {
    Person.call(this, name)

    this.writeCode = function () {
        console.log(this.name, 'writes code')
    }
} as any as { new (name: string): Developer }

Developer.prototype.__proto__ = Person.prototype

const person = new Person('John')
person.sayHello()
const dev = new Developer('Snow')
dev.sayHello()
dev.writeCode()
