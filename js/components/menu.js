class MenuSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        let generated = "";

        for (const child of this.children) {
            const tagName = child.tagName.toLowerCase();

            if (tagName === "menu-img") {
                const src = child.getAttribute("src");
                const alt = child.getAttribute("alt") || "Menu Image";
                generated += `
                    <div class="split-img">
                        <img src="${src}" alt="${alt}">
                    </div>
                `
            } else if (tagName === "menu-content") {
                const name = child.getAttribute("name");
                const columnsAttr = child.getAttribute("columns") || "";
                const columns = columnsAttr.split(",").map(c => c.trim());
                const headerCells = columns.map(col => `<th>${col}</th>`).join('');

                const items = child.querySelectorAll("menu-item");
                let tableRows = "";
                for (let item of items) {
                    const code = item.getAttribute("code");
                    const name = item.getAttribute("name");
                    const itemName = code ? `${code} ${name}` : name;

                    let priceCells = "";
                    for (const column of columns) {
                        const price = item.getAttribute(column) || "";
                        priceCells += `<td>${price}</td>`;
                    }

                    tableRows += `
                        <tr>
                            <td>${itemName}</td>
                            ${priceCells}
                        </tr>
                    `
                }

                generated += `
                    <div class="split-content">
                        <h2>${name}</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    ${headerCells}
                                </tr>
                            </thead>
                            <tbody>
                                ${tableRows}
                            </tbody>
                        </table>
                    </div>
                `
            }
        }

        const basePath = window.location.pathname.includes('/pages/') ? '..' : '.';
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${basePath}/css/menu.css">
            <div class="split-container">
                ${generated}
            </div>
        `
    }
}

customElements.define('menu-section', MenuSection);