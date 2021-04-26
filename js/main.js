const span = (text, index) => {
    const node = document.createElement('span')

    node.innerText = text;
    node.style.setProperty('--index', index)

    return node;
}

const byLetter = text => [...text].map(span)

const splitTargets = document.querySelectorAll('[data-split-letters]')

splitTargets.forEach(node => {
    let nodes = null;
    nodes = byLetter(node.innerText)

    if (nodes)
        node.firstChild.replaceWith(...nodes)
})