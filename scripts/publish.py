#!/usr/bin/env python3
"""Publish committed public assets to the existing gh-pages branch, without force."""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]


def git(*args, input=None):
    return subprocess.check_output(
        ["git", *args], cwd=ROOT, input=input, text=True
    ).strip()


def main():
    if git("status", "--porcelain"):
        sys.exit("Commit website changes before publishing.")
    source = git("rev-parse", "HEAD")
    git("fetch", "origin", "gh-pages")
    parent = git("rev-parse", "origin/gh-pages")
    entries = git("ls-tree", "HEAD", "--", "index.html", "assets", ".nojekyll")
    names = {line.split("\t", 1)[1] for line in entries.splitlines()}
    if names != {"index.html", "assets", ".nojekyll"}:
        sys.exit("Missing public entrypoint or assets; nothing was published.")
    tree = git("mktree", input=entries + "\n")
    if tree == git("rev-parse", parent + "^{tree}"):
        print("The published branch already matches the committed website.")
        return
    commit = git("commit-tree", tree, "-p", parent, "-m",
                 "Publish academic website from " + source[:12])
    git("push", "origin", commit + ":refs/heads/gh-pages")
    print("Published commit:", commit)
    print("GitHub Pages URL: https://berker408.github.io/MySite/")
    print("Wait for the Pages deployment to complete before checking the URL.")


if __name__ == "__main__":
    main()
