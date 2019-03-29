import { JokesProvider } from './load.config';
export function jokesProviderFactory(provider: JokesProvider){

    return () => provider.load();

}