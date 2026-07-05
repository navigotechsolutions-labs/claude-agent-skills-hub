#!/usr/bin/env python3
# Copyright 2025 rev1si0n (lamda.devel@gmail.com). All rights reserved.
#
# Distributed under MIT license.
# See file LICENSE for detail or copy at https://opensource.org/licenses/MIT
#encoding=utf-8
import os
import sys
import importlib.util


def embed_bridge(source, lang):
    # https://github.com/frida/frida/issues/3460#issuecomment-3066016776
    tools_dir = os.path.dirname(importlib.util.find_spec("frida_tools").origin)
    fmt = '(function() { %s; Object.defineProperty(globalThis, "%s", { value: bridge }); })(); %s'
    bridge = os.path.join(tools_dir, "bridges", f"{lang.lower()}.js")
    with open(bridge, "r", encoding="utf-8") as f:
        return fmt % (f.read(), lang, source)


if __name__ == "__main__":
    script = sys.argv[1]
    source = embed_bridge(open(script, "rt", encoding="utf-8").read(),
                                                            "Java")
    open("%s-embedded" % script, "w").write(source)