interface MyProxyHandler<T> {
    get?<U extends keyof T> (target: T, propName: U): {}
}

class MyProxy<T extends object> {
    constructor (private readonly target: T, private readonly handler: MyProxyHandler<T>) {}

    public getProxiedTarget (): T {
        const newTarget: Partial<T> = {}
        Object.keys(this.target).forEach(key => {
            Object.defineProperty(newTarget, key, {
                get: () => {
                    return this.handler.get
                        ? this.handler.get(this.target, key as keyof T)
                        : this.target[key as keyof T]
                }
            })
        })
        return newTarget as T
    }
}

const cat = {
    name: 'Barsik',
    age: 2
}

const proxiedCat = new MyProxy(cat, {
    get (target, propName) {
        if (propName === 'age') return 'access denied'
        else return target[propName]
    }
}).getProxiedTarget()

console.log(proxiedCat.age);
