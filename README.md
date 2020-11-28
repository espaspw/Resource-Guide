# Chinese-English Exchange Discord Server Resource List

This project that builds the resource list for the Chinese-English exchange discord server: [https://discord.gg/ADdR45y](https://discord.gg/ADdR45y). The resource list is accessible in either [markdown](https://github.com/espaspw/Resource-Guide/blob/master/resources.md) or as a [GitHub Pages site](https://espaspw.github.io/Resource-Guide/).

GitHub is accessible from within China and generally across all English-speaking and Chinese-language-speaking countries.  Although this is currently tailored towards people learning Chinese, our server is intended to serve as resources for both English and Chinese-language learners.

[Detailed Explanation of Chinese IMEs](https://github.com/espaspw/Resource-Guide/blob/master/doc/IMEs.md)


# Design
The primary use case is meant to be the GitHub Pages html site. Its design was chosen to be minimal:
1. statically generated via shellscript
2. filterability with CSS3
3. no primary or secondary functionality provided by JavaScript.

We are using YAML as the file format because:
1. Supports the tree structure that fits well with an organised list
2. Readable by both developer and computer
3. You can have reference nodes in more than one place
4. Can include comments

# Instructions

If you wish to contribute, you can build with the following steps:

You will need the following dependencies:
- [yq](https://github.com/kislyuk/yq) >= 2.0.0
- python2/python3 - required by 'yq'

First obtain a local copy of this repository
```sh 
git clone 'https://github.com/espaspw/Resource-Guide.git'
```

If you wish to add/edit/remove links, Make the changes to the [links.yaml](links.yaml). Then build the project again by running (when inside the repository directory)
```sh
./build.sh all
```

You may also wish to take a look at the help command
```sh
./build.sh help
```

# License
GPL v3.0

