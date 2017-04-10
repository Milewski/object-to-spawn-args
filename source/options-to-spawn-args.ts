function quote(value, toQuote) {
    return toQuote ? '"' + value + '"' : value
}

export function toSpawnArgs(args: { [key: string]: any }, config?: {}) {

    const output = []
    const options = Object.assign({ quote: false, equal: false, prefix: 'standard' }, config)

    for (let prop in args) {

        let value = args[prop]

        if (value !== undefined) {

            let prefix;

            if (options.prefix === 'standard') {
                prefix = prop.length === 1 ? '-' : '--'
            } else if (typeof options.prefix === 'function') {
                prefix = options.prefix(prop)
            } else {
                prefix = options.prefix
            }

            if (options.equal) {

                if (value === true) {
                    output.push(prefix + prop)
                } else {
                    if (Array.isArray(value)) {
                        output.push(prefix + prop + '=' + quote(value.join(','), options.quote))
                    } else {
                        output.push(prefix + prop + '=' + quote(value, options.quote))
                    }
                }

            } else {
                output.push(prefix + prop)
                if (value !== true) {
                    if (Array.isArray(value)) {
                        value.forEach(item => {
                            output.push(quote(item, options.quote))
                        })
                    } else {
                        output.push(quote(value, options.quote))
                    }
                }
            }
        }
    }
    return output
}

export default toSpawnArgs;
