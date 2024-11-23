import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { CommandExecutor } from '../../core/executor/command.executor';
import { ICommandExec } from '../../core/executor/command.types';
import { IStreamLogger } from '../../core/heandlers/stream-logger.interface';
import { ICommandExecFfmpeg, IFimpegInput } from './ffmpeg.types';
import { FileService } from '../../core/files/file.service';
import { PromptService } from '../../core/prompt/prompt.service';
import { FfmpegBuilder } from './ffmpeg.builder';
import { StreamHandler } from '../../core/heandlers/stream.handler';

export class FfmpegExecutor extends CommandExecutor<IFimpegInput> {
    private fileService: FileService = new FileService();
    private promptService: PromptService = new PromptService();

    constructor(logger: IStreamLogger) {
        super(logger)
    }

    protected async prompt(): Promise<IFimpegInput> {
        const width = await this.promptService.input<number>('ширина', 'number');
        const height = await this.promptService.input<number>('высота', 'number');
        const path = await this.promptService.input<string>('путь до файла', 'input');
        const name = await this.promptService.input<string>('имя', 'input');
        return { width, height, path, name }
    }
    protected build({ width, height, path, name }: IFimpegInput): ICommandExecFfmpeg {
        const output = this.fileService.getFilePath(path, name, 'mp4');
        const args = (new FfmpegBuilder)
            .input(path)
            .setVideoSize(width, height)
            .outPut(output);
        return { command: 'ffmpeg', args, output };
    }
    protected spawn({ output, command, args }: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileIfExists(output);
        return spawn(command, args);
    }
    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        const handler = new StreamHandler(logger);
        handler.processOutput(stream)
    }

}