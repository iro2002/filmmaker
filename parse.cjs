const fs = require('fs');

async function fetchThumbnail(url) {
    try {
        const fetch = (await import('node-fetch')).default || globalThis.fetch;
        const res = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`);
        const data = await res.json();
        return data.thumbnail_url_with_play_button || data.thumbnail_url || '';
    } catch (e) {
        return '';
    }
}

async function run() {
    const text = fs.readFileSync('input.txt', 'utf-8');
    const blocks = text.split(/(?:Link\s*:?\s*|https:\/\/vimeo\.com\/)/i).filter(b => b.trim());

    const videos = [];
    let idCounter = 1;

    for (let block of blocks) {
        if (!block.trim()) continue;

        const urlMatch = block.match(/(\d+)\/([a-z0-9]+)/i);
        let vimeoId = '';
        let vimeoHash = '';
        if (urlMatch) {
            vimeoId = urlMatch[1];
            vimeoHash = urlMatch[2];
        }

        const titleMatch = block.match(/Project [Tt]itle\s*:\s*(.*)/);
        const dateMatch = block.match(/Date\s*:\s*(.*)/);
        const roleMatch = block.match(/Role\s*:\s*(.*)/);
        const dopMatch = block.match(/DOP\s*:\s*(.*)/);
        const clientMatch = block.match(/Client\/Agency\s*:\s*(.*)/);
        const houseMatch = block.match(/Production House\s*:\s*(.*)/);
        const descMatch = block.match(/Description\s*:\s*([\s\S]*?)(?=(?:Link\s*:|Project [Tt]itle\s*:|$))/i);

        if (vimeoId) {
            const url = `https://vimeo.com/${vimeoId}/${vimeoHash}`;
            console.log("Fetching thumb for", url);
            const thumb = await fetchThumbnail(url);
            
            videos.push({
                id: `h${idCounter++}`,
                title: titleMatch ? titleMatch[1].trim() : '',
                vimeoId,
                vimeoHash,
                thumbnail: thumb,
                details: descMatch ? descMatch[1].trim().replace(/\n+/g, ' ') : '',
                projectType: 'Hospitality',
                date: dateMatch ? dateMatch[1].trim() : '',
                role: roleMatch ? roleMatch[1].trim() : '',
                dop: dopMatch ? dopMatch[1].trim() : '',
                client: clientMatch ? clientMatch[1].trim() : '',
                productionHouse: houseMatch ? houseMatch[1].trim() : '',
            });
        }
    }

    fs.writeFileSync('output.json', JSON.stringify(videos, null, 2));
    fs.writeFileSync('src/data/hospitalityData.js', 'export const hospitalityVideos = ' + JSON.stringify(videos, null, 2) + ';');
    console.log(`Parsed ${videos.length} videos.`);
}

run();
