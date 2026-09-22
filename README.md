# LiMA

**LiMA: Bridging Long-term Imagination to Real-time Dexterous Manipulation via Asynchronous Diffusion**

Ning Chen, Yankai Fu, Junkai Zhao, Qianpu Sun, Guocai Yao, Pengwei Wang, Zhongyuan Wang, and Shanghang Zhang.

Peking University · Beijing Academy of Artificial Intelligence

[Project website](https://ccdcs.github.io/LiMA_repo/)

This repository contains the LiMA research project website, including the overview video, abstract, method illustration, real-world manipulation demonstrations, experimental results, and generalization videos.

## Local preview

Run this command from the repository directory:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000>.

## Editing

- `index.html`: page content and media references.
- `static/css/index.css`: typography and layout.
- `static/js/index.js`: video carousels and page interactions.
- `static/images/`, `static/videos/`, and `static/pdfs/`: project media.

The site is static and can be published directly with GitHub Pages from the `main` branch and the repository root. The `.nojekyll` file disables Jekyll processing.

## Template attribution

The website is based on the [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template), adopted from [Nerfies](https://nerfies.github.io/). The template is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The attribution is retained in the website footer.
