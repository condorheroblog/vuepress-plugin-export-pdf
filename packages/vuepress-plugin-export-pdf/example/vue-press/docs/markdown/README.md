# Install
## title

title

> content

### Badge <Badge text="beta" type="warning"/> <Badge text="default theme"/>

- **Props**:

  - `text` - string
  - `type` - string, optional value: `"tip"|"warning"|"error"`，defaults to `"tip"`
  - `vertical` - string, optional value: `"top"|"middle"`，defaults to `"top"`

**Usage:**

You can use this component in a header to add some status for an API:

```md
### Badge <Badge text="beta" type="warning"/> <Badge text="default theme"/>
```

## Line Highlighting in Code Blocks

**Input**:

```md
``` js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
```
**Output**:

``` js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Line Numbers

You can enable line numbers for each code block via config:

```js
module.exports = {
  markdown: {
    lineNumbers: true,
  },
};
```

demo:

![line-numbers-desktop.png](./pictures/line-numbers-desktop.png)
