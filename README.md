# Otto: Your friendly machine learning assistant.
<img src="logo.png" width="80%">

## Build machine learning pipelines through natural language conversation
Otto is an intelligent chat application, designed to help aspiring machine learning engineers _go from idea to implementation with zero technical knowledge_. Our website features easy model selection, powerful visualization tools, and an intuitive natural language experience guiding you every step of the way. A collection of Wit backend apps service Otto's conversational abilities and machine learning tools throughout.

***

## Highlights

- **Beginner-friendly design.** Otto is made for novices, as it assumes no prior knowledge of machine learning. Users simply describe their objectives to obtain intelligent recommendations, or can choose from sample datasets to access optimized models in an instant.

- **Powerful machine learning tools.** A range of machine learning capabilities are supported, including models for regression, classification and natural language processing, as well as preprocessors tailored to your problem. Play with neural networks, explore data visualizations, and generate ready-made Python code right in your browser!

- **Educational experience.** Users are walked through each stage of the process and can ask Otto questions along the way. Generated code blocks are annotated to provide eager learners a high-level understanding of their end-to-end pipeline.

***

## Stages

### Task 

One of the biggest obstacles faced by those just getting started with ML is the abundance of jargon, from “loss functions” to “contour boundaries“ — beginners can't be expected to decide what model to use based on cryptic terminology, let alone develop one from scratch! Otto narrows down your options by inferring the high-level task at hand from a simple objective statement.

Task inference is powered by a Wit application (**Otto-Task**) trained on 300 such statements (e.g. “I want to detect loan applications as fraudulent”, “help me forecast stock prices”, or “let's summarize an article into a paragraph”) derived from real-world machine learning research. **Otto-Task** attempts to categorize the _task_ intent as regression, classification, or natural language processing, and additionally extracts a _subject_ entity embodying a streamlined form of the objective in order to filter out extraneous words. 

The subject is parsed for keyword matches (“tweets”, “housing”, etc) against our database of sample datasets. If a relevant dataset is found, Otto pulls the optimal task, model, and preprocessors for the dataset and pre-selects them for the user throughout the pipeline-building process. Otherwise, Otto issues a task recommendation based on the recognized intent. If no intent was identified, the user is provided with some tips to help them pick the best task themselves.

### Dataset

Users are offered the chance to select pre-prepared datasets matching their task, such as the famous Iris and Boston Housing sets. They may also decide to model their own custom data.

### Model

Each task features a suite of models covering different aspects of classification, regression, and NLP. Users are asked to go into a little more detail about their data
