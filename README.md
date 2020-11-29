# Value a company

This is a small project I did for fun but also because it might come in handy in the future!

## Purpose

As a value investor one of your main sources of information to choose a company to invest in is to study its financial state.
This is exactly what this app tries to do. By showing some basic financial information the user can quickly see if a company is worth considering or not.
Current finantial info displayed (more to come):
- Debt to equity
- Current ratio
- Return on equity

## Architecture

The front is made using VueJS

The backend is divided in several microservices coded in NodeJS. For this app I've used AWS lambda and API Gateway. The schema below gives an overview of the architecture of this project:

![alt text](https://github.com/Martfed/value_a_company/blob/main/value%20a%20company%20arch.png)

The user selects a company from a predifined list. This company is then sent to Main which is considered as a controller. It receives the payload and just calls the other two lambdas (cash flow and balance sheet) which are in charge of getting and processing the information. After sending it back to Main this one will send it to the Vue app for it be show in the front end.
