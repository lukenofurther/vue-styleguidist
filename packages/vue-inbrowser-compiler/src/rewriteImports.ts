const UNNAMED = /import\s*['"]([^'"]+)['"];?/gi
const NAMED = /import\s*(\*\s*as)?\s*(\w*?)\s*,?\s*(?:\{([\s\S]*?)\})?\s*from\s*['"]([^'"]+)['"];?/gi

function alias(previousKey: string) {
	let key = previousKey.trim()
	const name = key.split(' as ')
	if (name.length > 1) {
		key = name.shift() || ''
	}
	return { key, name: name[0] }
}

let num: number

function generate(keys: string[], dep: string, base?: string, fn?: string) {
	const depEnd = dep.split('/').pop()
	const tmp = depEnd
		? depEnd.replace(/\W/g, '_') + '$' + num++ // uniqueness
		: ''
	const name = alias(tmp).name

	dep = `${fn}('${dep}')`

	let obj
	let out = `const ${name} = ${dep};`

	if (base) {
		out += `\nconst ${base} = ${tmp}.default || ${tmp};`
	}

	keys.forEach(key => {
		obj = alias(key)
		out += `\nconst ${obj.name} = ${tmp}.${obj.key};`
	})

	return out
}

export default function(str: string, fn = 'require') {
	num = 0
	return str
		.replace(NAMED, (_, asterisk, base, req, dep) =>
			generate(req ? req.split(',').filter((d: string) => d.trim()) : [], dep, base, fn)
		)
		.replace(UNNAMED, (_, dep) => `${fn}('${dep}');`)
}
