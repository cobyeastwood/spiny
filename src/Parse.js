import htmlparser2 from 'htmlparser2';

export class Parse {
	constructor(options) {
		this.root = null;
		this.seen = new Set();

		this.setUp(options);
	}

	setUp({ data, options }) {
		if (typeof Buffer !== 'undefined' && Buffer.isBuffer(data)) {
			data = data.toString();
		}

		if (typeof data === 'string') {
			this.root = htmlparser2.parseDocument(data, options);
		}
	}

	find(target, root = this.root) {
		if (typeof target !== 'string') {
			throw new Error('parameter target must be of type string');
		}

		const targetLowerCased = target.toLowerCase();

		return this.transverse(root).filter(node => {
			if (node?.attribs?.href) {
				return node.attribs.href.includes(targetLowerCased);
			}

			if (node?.data) {
				return node.data.toLowerCase().includes(targetLowerCased);
			}

			return false;
		});
	}

	transverse(root = this.root) {
		if (!root) {
			return [];
		}

		let elements = [];
		let stack = [root];

		while (stack.length) {
			let node = stack.pop();

			if (!node) {
				continue;
			}

			if (this.seen.has(node)) {
				continue;
			}

			this.seen.add(node);
			elements.push(node);

			if (node.prev) {
				stack.push(node.prev);
			}

			if (node.next) {
				stack.push(node.next);
			}

			if (node.children) {
				for (let key in node.children) {
					stack.push(node.children[key]);
				}
			}
		}

		return elements;
	}
}
