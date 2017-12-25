import * as winston from 'winston';

import { txNamespace, TX_ID_KEY } from '../context';

export class Clogger {

    private appendTxInfo(params: any) {
        let txId = txNamespace.get(TX_ID_KEY);
        if (txId) {
            params['txId'] = txId;
        }
    }

    debug(message: string, params: any = {}): void {
        this.appendTxInfo(params);
        winston.debug(message, params);
    }

    info(message: string, params: any = {}): void {
        this.appendTxInfo(params);
        winston.info(message, params);
    }

    warn(message: string, params: any = {}): void {
        this.appendTxInfo(params);
        winston.warn(message, params);
    }

    exception(err: any, params: any = {}): void {
        this.appendTxInfo(params);
        let exceptionInfo = winston.exception.getAllInfo(err);
        for(let key of Object.keys(exceptionInfo)) {
            params[key] = (exceptionInfo as any)[key];
        }
        winston.error(params);
    }
}
    