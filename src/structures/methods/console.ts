// ? Functions related to the console.

export const $log = async (d: string): Promise<void> => {
    return void console.log(`[ LOGGED ] - ${d}`);
};
