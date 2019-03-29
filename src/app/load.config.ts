import bridge from '../tools/bridge';
// @Injectable()

export class JokesProvider {
    constructor() {

    }
    load() {
        console.log('loadinitapp');
        return bridge['getUserLoginInfo']();
    }
}

