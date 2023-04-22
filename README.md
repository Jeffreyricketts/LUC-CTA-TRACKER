# LUC CTA Tracker

![Commit Activity](https://img.shields.io/github/commit-activity/w/Jeffreyricketts/LUC-CTA-TRACKER)
![Code Size](https://img.shields.io/github/repo-size/Jeffreyricketts/LUC-CTA-TRACKER)

<sub>_COMP 324/424 Spring 2023_</sub>

A handy tool to streamline the process for Loyola Students to find information regarding the CTA routes that impact them most.

**Group Members**:
- Ben Tweet
- Waad Al Abdulrhman
- Jeffrey Ricketts-Hagan
- Sai Saranya Dasari

## About The Project

The LUC CTA Tracker is a web application that displays pertinent CTA train and bus arrival information for exclusively stops that Loyola Chicago students might use to commute between campuses. 

Our app was developed using purely HTML, CSS, and Javascript in conjunction with the CTA's advances train and bus tracking APIs. 

**For more information on the CTA API:**
- :train: [Train Tracker API](https://www.transitchicago.com/developers/ttdocs/)
- :bus: [Bus Tracker API](https://www.transitchicago.com/developers/bustracker/)

### App Troubleshooting

In some cases, the APIs experience a CORS blocking error, resulting in CTA data not being accessed or displayed on the site. If this occurs, one solution is to install the CORS Unblock browser extension, and enable it _only_ while running the application. 

The CORS Unblock browser extension for chrome can be found here: [CORS Unblocker](https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino?hl=en)

Also, if accessing the site between ~12:45am-5:00am, it is likely there will not be any bus data available. This is not a bug! The 147 and 155 busses only run from 5am to about 12:20am the following day, so more than likely this is just the API not finding any currently running busses.

## Project TODOs:
- [x] Refactor project to be consistent with responsive design patterns
- [x] Activating the map  and the search field.
- [x] Finish implementing CTA API scripts to pull, parse, and display all bus, train data to the site.
- [ ] Find new/unique fonts to use throughout the site
- [x] Add automatic refreshing of CTA time tables with graphical countdown
- [ ] Work on embedding images where beneficial to overall site design
- [x] Create links in side navigation menu to points in the DOM where the respective routes can be found
- [ ] Decide on final order of elments in the website (ie. CTA info before or after Google map)
- [ ] Implement MTA vs CTA statistics (which train will arrive first, which line has a higher % of current delays)
