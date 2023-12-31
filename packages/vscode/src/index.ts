import * as serverProtocol from "@volar/language-server/protocol";
import type { ExportsInfoForLabs } from "@volar/vscode";
import { supportLabsVersion } from "@volar/vscode";
import * as vscode from "vscode";
import * as lsp from "vscode-languageclient/node";

let client: lsp.BaseLanguageClient;

export async function activate(context: vscode.ExtensionContext) {
	const serverModule = vscode.Uri.joinPath(
		context.extensionUri,
		"dist",
		"server.js",
	);
	const runOptions = { execArgv: [] as string[] };
	const debugOptions = { execArgv: ["--nolazy", `--inspect=${6009}`] };
	const serverOptions: lsp.ServerOptions = {
		run: {
			module: serverModule.fsPath,
			transport: lsp.TransportKind.ipc,
			options: runOptions,
		},
		debug: {
			module: serverModule.fsPath,
			transport: lsp.TransportKind.ipc,
			options: debugOptions,
		},
	};
	const clientOptions: lsp.LanguageClientOptions = {
		documentSelector: [{ language: "html" }],
		initializationOptions: {},
	};
	client = new lsp.LanguageClient(
		"unocss-lsp",
		"UnoCSS LSP",
		serverOptions,
		clientOptions,
	);
	await client.start();

	// support for https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volarjs-labs
	// ref: https://twitter.com/johnsoncodehk/status/1656126976774791168
	return {
		volarLabs: {
			version: supportLabsVersion,
			languageClients: [client],
			languageServerProtocol: serverProtocol,
		},
	} satisfies ExportsInfoForLabs;
}

export const deactivate = (): Thenable<any> | undefined => client?.stop();
