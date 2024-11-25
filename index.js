import puppeteer from "puppeteer";
const browser = await puppeteer.launch();
const page = await browser.newPage();

// console.log("page", page);
// const jobSearchUrl =
//     "https://www.indeed.com/jobs?q=software+developer&l=remote&vjk=3174438e156ea133";

// await page.goto(jobSearchUrl, { waitUntil: "domcontentloaded" });

// console.log("page", page);
// const c = await page.evaluate(() => {
//     const jobCards = document.getElementById("host-hydrated");
//     return jobCards;
// });
// console.log("page3", c);
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    const jobSearchUrl =
        "https://www.indeed.com/jobs?q=software+developer&l=remote&vjk=3174438e156ea133";
    await page.goto(jobSearchUrl);

    const handles = await page.$$(".css-1ac2h1w");
    // console.log(handles);
    // handles.forEach(async ()=>{
    //     await page.evaluate((el)=>el.querySelector(""))
    // })
    const jobs = await page.evaluate(() => {
        const jobCards = document.querySelectorAll(".job_seen_beacon"); // Update selector if necessary
        const jobData = [];

        jobCards.forEach((card) => {
            const title = card.querySelector("h2 > a")?.textContent?.trim();
            const company = card
                .querySelector(".css-1h7lukg")
                ?.textContent?.trim();
            const location = card
                .querySelector(".css-1restlb")
                ?.textContent?.trim();
            // const summary = card
            //     .querySelector(".css-o11dc0 > ul > li")
            //     ?.textContent?.trim();
            const link = card.querySelector("h2 > a")?.href;

            const summaryElement = card.querySelector(".css-o11dc0 ul"); // Update selector for summary
            const summary = [];
            if (summaryElement) {
                summaryElement.querySelectorAll("li").forEach((li) => {
                    summary.push(li.textContent.trim());
                });
            }

            jobData.push({ title, company, location, summary, link });
        });

        return jobData;
    });

    console.log(jobs);
})();
