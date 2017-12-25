import * as cls from 'cls-hooked';

export const txNamespace = cls.createNamespace('tx');
export const TX_ID_KEY = 'context-id';

export class TxContext {

    async beginTx(id: string, operation: () => Promise<void>) {
        await new Promise((resolve, reject) => {
            txNamespace.run(() => {
                txNamespace.set(TX_ID_KEY, id);
                operation().then(() => resolve()).catch(err => reject(err));
                txNamespace.set(TX_ID_KEY, undefined);
            });
        });
    }

    get currentTxId(): number {
        let result = txNamespace.get(TX_ID_KEY);
        if(result === undefined || result == null) {
            throw new Error('This operation requires a transaction');
        }
        return result;
    }
    
}

