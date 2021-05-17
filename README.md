# vue-elementui

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


新入职员工工作流程
git clone

我们可以和远程建立链接
将本地仓库和线上仓库建立关联：git remote add origin [线上仓库的SSH地址]

 如果在执行这句话的时候报错：fatal: remote origin already exists.

 那么就先执行 git remote rm origin

 再重新执行 git remote add origin [线上仓库的SSH地址]

代码添加到暂存区 git add -A (也可以 git add [文件名] 来单独添加某一个文件)

代码提交到本地仓库 git commit -m '[说明本次提交所做的操作，越详细越好]'

代码推送到远程 git push origin master
此时可以查看当前所在分支 
git branch
可以查看远程分支和本地分支
git branch -a
假设远程分支有 master和ask,领导安排我到ask分支
所以我可以 拉取远程ask分支到本地ask分支，简写
git pull origin ask:ask
我们此时就有ask分支了，可以切换到ask分支
git checkout ask
我们就可以在这个分支开发代码了
开发后需要提交 
git add .
git commit -m '注释'
git push origin ask
如果此时报错还没建立远程链接，那我们先建立远程链接 
我们可以提前建立链接
(可以根据报错提示，对应响应的操作)

git push origin ask推送成功后
ask是更新后的了，但是master还是旧的
(这里需要一个人做代码合并的操作,这个感觉不需要你自己合并)
(如果要自己合并的话，去ask分支，， git rebase master
git checkout master  git merge ask 进行平滑的合并
然后git push origin master 推送到远程仓库
)
我们下次开发再从主分支拉最新的代码

# 常见错误
最近在使用git的时候，git pull合并代码的时候，发生冲突。
最后返回一个MERGING状态。
(mian|master)
git reset --hard head

