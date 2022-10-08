# Vaccinity

'Vaccinity' is a a platform that improves the experience and process surrounding vaccinations.

## Installation

Use the npm to install necessary modules.

```bash
npm install
```

## Usage

Start scripts by npm start.
```bash
npm start
```

## Heroku Link

https://pure-savannah-70273.herokuapp.com/

# Home Page
## Menu bar
  The home button is linking to the home page. The Article button is linking to article pages. The Appointment button is linking to booking of appointment (login is not required for now ).

## Tabs Section

### First Tab (Who and When)
In this section, you can find information on vaccine schedules on childhood, school-age, and adult immunization. You'll also find information on vaccines and pregnancy, travel vaccines, and vaccination for immigrants. You can simply click on the button of interest and that will lead you to an information page. Please be aware that you cannot access the information pages solely through url, please start from the home page.

### Second Tab (What Vaccination Do You Need)
You can select and input birth-dates of interest and location of interest and find vaccination information regarding the location or age group. Clicking the Search button will lead you to a page with all the information.

## Articles
You can click on an article of interest to view the article. You can also click on the "Explore All" button in the articles section on Home page or the "Articles" button on the navbar to view all available articles. If your account has the admin status, then you can choose to edit a specific article by selecting that article and the "Edit" button on the top right. Admins can also all articles by going to the page with all articles and selecting the "Add Article" button on the top right. 

## Slideshow
A slideshow with different images that direct users to different pages, a small gallery that shows info about vaccine.

# Book Appointment
Appointment contains three pages in total. In order to make an appointment user has to log in first. <br />

The first page is a welcome page with some important infomation that user should know, and there's a giant "book now" button in the certer of the screen, after user clicks this button they will be directed to the next page.

The second page is for user to choose their preferences for the booking. The user will have to choose the booking date they want first through a date picker which can only select the next three days. All the other invalid date inputs will prevent the user to move forward. After user selects a valid date they can see available time slots on that day, the system will check the database to see which slots are not available and disable the choice. User can also pick a different date at this point. After the user has selected a time slot it will appear as a pink-color button, and a dialog will pop up that asks user if they want to use a different phone number for this booking. If the user tries to click a selected button then an alert will pop up. After making all these choices the user can move forward to the next page which is the result page. <br />

The last page is a result table that shows the booking is done with all the choices that the user just made. <br />
The user can review and cancel their bookings in dashboard/Appointment.

# Login Page
On the top right corner there is a LOGIN button from which you could log in to access the dashboard. There are 2 pre-created accounts in the database. Please select the correct type for login.
General User: username="user" password="user"
Health Professional (Admin): username="admin" password="admin"

From the login page, you could press the register button to redirect you to the registration page. You should be automatically logged in after making a new account successfully. There is also a link to go back to the log in page from the registration page.

# User Dashboard
After logging in, you will be redirected to the Dashboard Home page. On the top is the menu bar for you to access the website, while on the left there is a side navigation bar to redirect to different pages for user functionalities.
  1. Dashboard Home: A first page that greets you after logging in.
  2. My profile: A whole section to access your personal information and changing them, including password.
  3. Immunization record (eIR): A detailed history of your vaccination.
  4. Appointment: A page to check all your upcoming appointments.

# Admin Dashboard
Very similar to User Dashboard. After logging in, you will be redirected to the Dashboard Home page. On the top is the menu bar for you to access the website, while on the left there is a side navigation bar to redirect to different pages for admin functionalities.
  1. Dashboard Home: A first page that greets you after logging in.
  2. My profile: A whole section to access your personal information and changing them, including password.
  3. Search User: A search page to search for specific user(s) and modify their information, including the ability to add new vaccination history.
  4. Appointment: A page to check all your upcoming appointments.
  




