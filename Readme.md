# Hacker News Clone

This project is a full-stack that clones the functionality of Hacker News, using Django as the backend framework and React as the frontend. The 
aim of this project is to allow a user navigate to the web page of their likes and perform relevant create, update, retrieve and delete operations as far as the site is concerned.  It uses a powerful
python message task queue consumer called Celery. Other important tools we used to ensure scalability, high performance, robust and testable application are Redux, Celery Beat, PostgreSQL, Pytest, Jest, Requests and Django RestFramework. 


Here's a detailed explanation of why we chose Celery over Django signals in handling our periodic distrbuted backend task of the hackernews, especially when dealing with large datasets:

## Why Celery?
Celery is a distributed task queue that allows us to run tasks asynchronously in the background. This is particularly useful when dealing with large datasets, as it allows us to scale our application more efficiently.

Limitations of Django Signals
Django signals are a great way to notify certain parts of our application when certain events occur. However, they have some limitations when dealing with large datasets:

- *Performance*: Django signals can impact performance, especially when dealing with large amounts of data. This is because signals are executed synchronously, which can block other parts of our application.
- *Scalability*: Django signals are not designed to handle large amounts of data. As our dataset grows, our signals can become slower and less reliable.
- *Complexity*: Django signals can add complexity to our application, especially when dealing with multiple signals and receivers.

*Debugging*: Django signals can make it harder to debug our application, especially when dealing with complex signal-receiver relationships.



Benefits of Using Celery
Celery offers several benefits when dealing with large datasets:

- *Asynchronous Processing*: Celery allows us to run tasks asynchronously in the background, which can improve performance and scalability.
- *Distributed Task Queue*: Celery provides a distributed task queue that can handle large amounts of data. This makes it easier to scale our application.
- *Fault-Tolerant*: Celery is fault-tolerant, which means that if a task fails, it can be retried automatically.
- *Celery Beat Scheduler*: This handles scheduling th periodic task in the admin for celery every 5 mins.

- In conclusion, Celery is a better choice than Django signals when dealing with large datasets. Its asynchronous processing, distributed task queue, and fault-tolerant design make it more scalable and reliable. While Django signals are great for small to medium-sized datasets, Celery is a better choice for large and complex datasets.


## Benefits of Using React
React is a JavaScript library for building user interfaces. We chose React for the following reasons:

- *Fast and Efficient*: React is fast and efficient, making it perfect for building complex and data-driven user interfaces.
- *Easy to Learn*: React is easy to learn, even for developers without prior JavaScript experience.
- *Large Community*: React has a large and active community, which means there are many resources available to help us learn and troubleshoot.
- *Scalability*: React makes it easy to scale our application's user interface as our application grows.

Importance of Testing
Testing is an essential part of building any software application. We use Pytest for our backend tests and Jest for our frontend tests. Testing ensures that our application works as expected and catches any bugs or errors before they reach our users.

Getting Started
_Prerequisites_

- Python 3.9+
- Node.js 14.17+
- Django 3.2
- redis (on your Linux or WSL machine)
- Celery
- Django RestFramework
- React 17.0

_Installation_

1. Clone the repository: git clone https://github.com/blaise-93/hacker-news-clone.git
2. Install backend dependencies: pip install -r requirements.txt
3. Install frontend dependencies: npm install
4. Create a new Django project: django-admin startproject hackernews
5. Create a new React app: npm init vite@latest (follow the steps and select React with Typescript)
6. Configure the backend and frontend to work together

_Running the App_

1. Start the backend server: python manage.py runserver
2. Start the frontend server: npm run dev
3. Open a web browser and navigate to http://localhost:3000
4.  Start the celery server: celery -a hackernews worker -l info
5. Start the celery beat server: celery -A hackernews beat -l info --scheduler django_celery_beat.schedulers.DatabaseScheduler 

Links
- https://docs.djangoproject.com/en/3.2/
- https://reactjs.org/docs/getting-started.html
- https://redux.js.org/introduction/getting-started
- https://docs.pytest.org/en/latest/
- https://jestjs.io/docs/getting-started
- https://pypi.org/project/celery/