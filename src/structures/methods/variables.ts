// ? Functions related to the locale storage.

const storage: { [key: string]: any } = {};

export const $stack = async (name: string, value: any): Promise<void> => {
    storage[name] = value;
};

export const $get = (name: string): any => {
    return storage[name];
};
