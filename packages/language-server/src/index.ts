import type {
	LanguageServerPlugin,
	Service,
} from "@volar/language-server/node";
import {
	createConnection,
	startLanguageServer,
} from "@volar/language-server/node";

const plugin: LanguageServerPlugin = (): ReturnType<LanguageServerPlugin> => ({
	resolveConfig(config) {
		// languages
		config.languages ??= {};
		config.languages.unocss ??= language;

		// services
		config.services ??= {};
		config.services.unocss ??= (context): ReturnType<Service> => ({
			provideCompletionItems() {},
		});

		return config;
	},
});

startLanguageServer(createConnection(), plugin);
