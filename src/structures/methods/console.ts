export const $log = async (d: any): Promise<void> => {
    let result = d;
    if (typeof d == "function") {
        result = await d();
    }

    return void console.log(`[LOGGED] - ${result}`);
};
