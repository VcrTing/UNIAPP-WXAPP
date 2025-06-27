
// export const promise = <T> (call: () => T): Promise<T> => new Promise(rej => rej( call() ))


// [还未被测试为完全异步，可能还是同步] call 内方法，异步
export const promise = <T> (call: () => T | undefined): Promise<T | undefined> => new Promise(resolve => { const res: T | undefined = call(); resolve(res ? res : undefined) })

// 联网 方法，完全异步
export const future = async <T> (call: () => T | undefined): Promise<T | undefined> => new Promise(async resolve => { const res: T | undefined = await call(); resolve(res ? res : undefined) })

export const timeout = <T> (call: () => T | null, haomiao: number = 0): number | undefined => call ? setTimeout(call, haomiao ? haomiao : 0) : undefined

const REACTION_TIME: number = 7


export const promising = <T> (
        aii: ONE,
        call: () => T | undefined,
        freeze_time: number = REACTION_TIME
    ): Promise<T | undefined> => 
        new Promise(resolve => { 
            let res: T | undefined = undefined
            if (aii && call) {
                if (aii.ioading) { resolve(undefined); return }
                else {
                    aii.ioading = true
                    res = call(); 
                    timeout(() => aii.ioading = false, freeze_time)
                }
            }
            resolve(res ? res : undefined) 
        })


// 带加载的 方法
export const futuring = async <T> (
        aii: ONE,
        call: () => T | undefined,
        release_msecond: number = REACTION_TIME
    ): Promise<T | undefined> => 
        new Promise(async resolve => { 
            let res: T | undefined = undefined
            if (aii && call) {
                if (aii.ioading) { resolve(undefined); return }
                else {
                    aii.ioading = true
                    try {
                        res = await call(); 
                    }
                    catch (err) {  }
                    finally {
                        timeout(() => aii.ioading = false, release_msecond)
                    }
                }
            }
            resolve(res ? res : undefined)
        })

export const deloop = (fn: Function, delay: number): () => null => {
    let isActive = true;

    function execute() {
        if (!isActive) return;

        try {
            fn();
        } catch (error) {
            console.error('执行出错:', error);
        }

        if (isActive) {
            setTimeout(execute, delay);
        }
    }

    execute();
    return () => { isActive = false; };
}
/*
function retry(fn: Function, max = 1) {
    let retryCount = 0;
    let lastError = null;

    while (retryCount <= max) {
        try {
            return fn();
        } 
        catch (error: any) {
            lastError = error;
            retryCount++;
            
            if (retryCount <= max) {
                console.log(`执行失败，第 ${retryCount} 次重试...`, error.message);
            }
        }
    }

    throw lastError;
}
*/

export const retrying = async <T>(fn: Function, fn_err: Function, max = 1): Promise<T | undefined> => {
    let cc = 0;
    let lastError = null;

    while (cc <= max) {
        // console.log('============== 执行 cc =', cc)
        try {
            const res: T = await fn();

            return res;
        } 
        catch (error: any) {
            lastError = error;
            cc++;
        }
    }

    if (lastError) {
        try {
            fn_err(lastError.message)
        }
        finally {

        }
    }
}

export const error = (msg: any) => {
    throw new Error(msg + '');
}