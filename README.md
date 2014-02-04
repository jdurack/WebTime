WebTime
=======================

"keep tabs on your tabs"


WebTime is a dead-simple Chrome extension that keeps track of how much time you spend on certain sites each day.

You configure a list of sites on which you want to track time, and a daily time limit.  WebTime gives you a colored icon in the toolbar to help you keep track of your daily time on those sites.

The toolbar icon changes slowly from green -> yellow -> orange -> red.  When you're on a listed site, it shows you your total minutes today on your site list.  If you've gone over your alotment, it adds '!'.

I find it useful to know how much time I'm spending 'unproductively'.  I set my list to be domains that I go when I'm bored, e.g. 'cnn.com', 'techcrunch.com', etc.

Requires npm and grunt.

To install:
1) Run 'npm install'
2) Run 'grunt'
3) Open Chrome, go to chrome://extensions
4) Make sure 'Developer Mode' is selected
5) Click 'Load unpacked extension...'
6) Select the 'WebTime/app' directory and click 'Open'

To configure:
1) Right click the extension icon on the right side of your Chrome toolbar, and select 'options'.  The icon should be a green circle.
2) Set the time limit per day.
3) Add the list of sites on which you'd like to keep track of your time.

Enjoy!

-jdurack