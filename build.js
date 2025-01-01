const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

const templateDir = path.join(__dirname, 'views');
const outputDir = path.join(__dirname, 'public');

const data = {
    siteTitle: "Dain's Portfolio site",
};

if(!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(templateDir,(err, files) => {
    if(err) throw err;

    files.forEach((file) => {
        const templatePath = path.join(templateDir, file);
        const template = fs.readFileSync(templatePath, 'utf-8');
        const compileTemplate = Handlebars.compile(template);

        const outputFileName = file.replace('.hbs', '.html');
        const outputPath = path.join(outputDir, outputFileName);

        fs.writeFileSync(outputPath, compileTemplate(data));
    });
});