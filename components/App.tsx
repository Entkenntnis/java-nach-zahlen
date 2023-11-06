import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { useEffect, useRef, useState } from 'react'
import { java, javaLanguage } from '@codemirror/lang-java'
import { defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language'

export function App() {
  const editor = useRef(null)
  const [debug, setDebug] = useState('')

  useEffect(() => {
    if (editor.current) {
      const startState = EditorState.create({
        doc: `class Marker {
  public static void main(string[] args) {
    System.out.println("Das ist ein String");
  } 
}`,
        extensions: [
          syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
          java(),
          EditorView.updateListener.of((e) => {
            if (e.docChanged) {
              const tree = javaLanguage.parser.parse(e.state.doc.toString())
              let output = ''
              let cursor = tree.cursor()
              do {
                let pad = ''
                let t = cursor.node.cursor()
                while (t.parent() && pad.length < 20) {
                  pad += '｜ '
                }
                output += `${pad} ${cursor.name} (${cursor.from} - ${cursor.to})\n`
              } while (cursor.next())
              setDebug(output)
            }
          }),
        ],
      })

      const view = new EditorView({ state: startState, parent: editor.current })

      return () => {
        view.destroy()
      }
    }
  }, [])

  return (
    <div className="h-full flex">
      <div className="w-1/2 bg-white p-1">
        <div ref={editor}></div>
      </div>
      <div className="w-1/2 bg-green-200 overflow-auto p-1 text-sm">
        <pre>{debug}</pre>
      </div>
    </div>
  )
}
