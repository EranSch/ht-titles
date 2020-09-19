var fs = require('fs');
var csv = require('csv');

const heading = {
    title: 0,
    url: 1,
    text: 2,
    dead: 3,
    by: 4,
    score: 5,
    time: 6,
    type: 7,
    id: 8,
    parent: 9,
    descendants: 10,
    ranking: 11,
    deleted: 12,
    timestamp: 13
};

const parser = csv.parse({});

// Use the readable stream api
parser.on('readable', function () {
    let record
    while (record = parser.read()) {
        const title = record[heading.title];
        if (title.length && title !== 'title') {
            fs.appendFileSync('message.txt', title + "\n");
        }
    }
});

parser.on('error', function (err) {
    console.error(err.message)
})

fs.createReadStream(__dirname + '/hacker_news_sample.csv').pipe(parser)

// fs.createReadStream(__dirname + '/hacker_news_sample.csv')
//     .pipe(csv.parse({ skip_lines_with_error: true }))
//     .pipe(csv.transform(function (record) {
//         const title = record[heading.title];
//         if (title.length && title !== 'title') {
//             fs.appendFileSync('message.txt', title + "\n");
//         }
//         return record;
//     }))
//     .on('error', e => { throw e; });