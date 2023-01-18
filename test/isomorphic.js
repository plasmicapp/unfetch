import fs from 'fs';
import vm from 'vm';

const fetch = () => 'this is fetch';
const unfetch = () => 'this is unfetch';
const nodeFetch = {
	default: () => 'this is node-fetch'
};

const modules = {
	unfetch,
	'node-fetch': nodeFetch
};
function customRequire(module) {
	return modules[module];
}

describe('isomorphic-unfetch', () => {
	describe('"browser" entry', () => {
		it('should resolve to fetch when window.fetch exists', () => {
			let sandbox = {
				process: undefined,
				window: { fetch },
				fetch,
				exports: {},
				require: customRequire
			};
			sandbox.global = sandbox.self = sandbox.window;
			sandbox.module = { exports: sandbox.exports };
			let filename = require.resolve('../packages/isomorphic-unfetch/browser');
			vm.runInNewContext(fs.readFileSync(filename), sandbox, filename);

			expect(sandbox.module.exports).toBe(fetch);
		});

		it('should resolve to unfetch when window.fetch does not exist', () => {
			let sandbox = {
				process: undefined,
				window: {},
				exports: {},
				require: customRequire
			};
			sandbox.global = sandbox.self = sandbox.window;
			sandbox.module = { exports: sandbox.exports };
			let filename = require.resolve('../packages/isomorphic-unfetch/browser');
			vm.runInNewContext(fs.readFileSync(filename), sandbox, filename);

			expect(sandbox.module.exports).toBe(unfetch);
		});
	});

	describe('"main" entry', () => {
		it('should resolve to fetch when window.fetch exists', () => {
			let sandbox = {
				process: undefined,
				window: { fetch },
				fetch,
				exports: {},
				require: customRequire
			};
			sandbox.global = sandbox.self = sandbox.window;
			sandbox.module = { exports: sandbox.exports };
			let filename = require.resolve('../packages/isomorphic-unfetch');
			vm.runInNewContext(fs.readFileSync(filename), sandbox, filename);

			expect(sandbox.module.exports).toBe(fetch);
		});

		it('should resolve to unfetch when window.fetch does not exist', () => {
			let sandbox = {
				process: undefined,
				window: {},
				exports: {},
				require: customRequire
			};
			sandbox.global = sandbox.self = sandbox.window;
			sandbox.module = { exports: sandbox.exports };
			let filename = require.resolve('../packages/isomorphic-unfetch');
			vm.runInNewContext(fs.readFileSync(filename), sandbox, filename);

			expect(sandbox.module.exports).toBe(unfetch);
		});
	});

	describe('"main" entry in NodeJS', () => {
		it('should resolve to node-fetch (changed from upstream for Plasmic) when window.fetch exists', () => {
			let sandbox = {
				process: {},
				global: { fetch },
				exports: {},
				require: customRequire
			};
			sandbox.global.process = sandbox.process;
			sandbox.module = { exports: sandbox.exports };
			let filename = require.resolve('../packages/isomorphic-unfetch');
			vm.runInNewContext(fs.readFileSync(filename), sandbox, filename);

			expect(sandbox.module.exports('/')).toBe('this is node-fetch');
		});

		it('should resolve to node-fetch when window.fetch does not exist', () => {
			let sandbox = {
				process: {},
				global: {},
				exports: {},
				require: customRequire
			};
			sandbox.global.process = sandbox.process;
			sandbox.module = { exports: sandbox.exports };
			let filename = require.resolve('../packages/isomorphic-unfetch');
			vm.runInNewContext(fs.readFileSync(filename), sandbox, filename);

			expect(sandbox.module.exports('/')).toBe('this is node-fetch');
		});
	});
});
