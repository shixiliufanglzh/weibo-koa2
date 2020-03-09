interface IResData<T> {
    errno: number;
    data: T;
    message: string;
}

export interface IErrResData {
    errno: number;
    message: string;
}

export class BaseModel {
    errno: number;
    data: any;
    message: string;
    constructor(resData: IResData<any>) {
        this.errno = resData.errno;
        this.data = resData.data || null;
        this.message = resData.message || '';
    }
}

export class SuccessModel extends BaseModel {
    constructor(data?: any) {
        super({ errno: 0, data, message: '' });
    }
}

export class ErrorModel extends BaseModel {
    constructor(errResData: IErrResData) {
        super({ ...errResData, data: null });
    }
}
