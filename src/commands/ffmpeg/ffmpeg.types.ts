import { ICommandExec } from '../../core/executor/command.types';

export interface IFimpegInput {
    width: number;
    height: number;
    path: string;
    name: string
}

export interface ICommandExecFfmpeg extends ICommandExec {
    output: string;
}