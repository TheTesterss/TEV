// ? Functions related to the internal process.

import { OS, Process } from "../../types/types";
import os from "node:os";
import { execSync } from "node:child_process";

const getLinuxDistribution = () => {
    try {
        const distrib = execSync("lsb_release -ds || cat /etc/*release | grep ^NAME= | head -n1").toString().trim();
        return distrib.split("=")[1].replace(/"/g, "");
    } catch (e) {
        return "Unknown Linux Distribution";
    }
};

const getOSType = () => {
    let result;
    switch (os.platform()) {
        case "darwin":
            result = "Mac";
            break;
        case "android":
            result = "Android";
            break;
        case "linux":
            result = "Linux";
            break;
        case "win32":
            result = "Windows";
            break;
        default:
            result = "Unknow";
            break;
    }

    return result;
};

const formatUptime = (uptime: number) => {
    const days = Math.floor(uptime / (24 * 60 * 60));
    const hours = Math.floor((uptime % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((uptime % (60 * 60)) / 60);
    const seconds = Math.floor(uptime % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const formatMemory = (bytes: number) => {
    const gigabytes = (bytes / 1024 ** 3).toFixed(2);
    return `${gigabytes} GB`;
};

export const $OS = (type: OS): any => {
    let result;
    switch (type) {
        case "architecture":
            result = os.arch();
            break;
        case "cpuModel":
            result = os.cpus()[0].model;
            break;
        case "cpuSpeed":
            result = `${os.cpus()[0].speed} Mhz`;
            break;
        case "distribution":
            if ($OS("type") != "Linux") {
                throw new Error("[ $OS[distribution] ] - You need to be on Linux to know that.");
            }
            result = getLinuxDistribution();
            break;
        case "freeMemory":
            result = formatMemory(os.freemem());
            break;
        case "totalMemory":
            result = formatMemory(os.totalmem());
            break;
        case "platform":
            result = os.platform();
            break;
        case "type":
            result = getOSType();
            break;
        case "uptime":
            result = formatUptime(os.uptime());
            break;
        case "version":
            result = os.release();
            break;
        default:
            throw new Error(`[ $OS[${type}] ] - The argument must be available.`);
    }

    return result;
};

export const $process = async (type: Process): Promise<any> => {
    let result;
    switch (type) {
        case "nodeVersion":
            result = process.version;
            break;
        case "npmVersion":
            result = execSync("npm -v").toString().trim();
            break;
        case "ping":
            result = new Promise((resolve) => {
                setTimeout(() => {
                    resolve(String(Math.random() * 100));
                }, 100);
            });
            break;
        case "tevVersion":
            result = "...";
            break;
        default:
            throw new Error(`[ $process[${type}] ] - The argument must be available.`);
    }

    return result;
};
