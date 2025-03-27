import { FC, useContext, useLayoutEffect, useRef, useState } from 'react'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import EditorElementCross from './EditorElementCross'
import { IEditorBadge, IEditorWidget } from '../Sections/RoomEditor'
import {
  getEditorBadgePercentSize,
  getEditorBadgePxSize,
  getEditorElementPosition,
  getEditorElementPositionInPx
} from '@/utils/getEditorElementPosition'
import { WidgetType } from '@/types/room.interface'
import { useScreenObserver } from '@/hooks/useScreenObserver'
import { Resizable } from 're-resizable'
import { RoomAppearanceContext } from '@/Context'
import { colorVariantsHover } from '@/consts/roomColors'

interface IEditorElement {
  type: 'badge' | 'widget'
  badge_img?: string
  badge_id?: number
  element?: JSX.Element
  className?: string
  widgetType?: WidgetType
  setEditorWidgets: React.Dispatch<React.SetStateAction<IEditorWidget[]>>
  setEditorBadges: React.Dispatch<React.SetStateAction<IEditorBadge[]>>
  width?: number
  height?: number
  translateX?: number
  translateY?: number
  zIndex: number
  isActiveEditor: boolean
  isCancelEdit: boolean
  containerSize: { width: number; height: number }
  setIsUnsaved: React.Dispatch<React.SetStateAction<boolean>>
}

const EditorElement: FC<IEditorElement> = ({
  type,
  element,
  className,
  badge_img,
  badge_id,
  widgetType,
  setEditorWidgets,
  setEditorBadges,
  width,
  height,
  translateX,
  translateY,
  zIndex,
  isActiveEditor,
  isCancelEdit,
  containerSize,
  setIsUnsaved
}) => {
  const [translate, setTranslate] = useState({
    x: 0,
    y: 0
  })
  const [translatePercent, setTranslatePercent] = useState({
    x: 0,
    y: 0
  })
  const elementRef = useRef<HTMLDivElement | null>(null)
  const [isPosSetted, setIsPosSetted] = useState(false)
  const [badgeSize, setBadgeSize] = useState<{
    width: number
    height: number
  } | null>(null)
  const [badgeSizePercent, setBadgeSizePercent] = useState({
    width: 0,
    height: 0
  })
  const [badgeAspect, setBadgeAspect] = useState<number | null>(null)
  const roomAppearance = useContext(RoomAppearanceContext)

  const handleRemove = () => {
    if (type === 'widget' && element) {
      setEditorWidgets((prev) => prev.filter((w) => w.type !== widgetType))
    }

    if (type === 'badge' && badge_id) {
      setEditorBadges((prev) => prev.filter((b) => b.badge_id !== badge_id))
    }
  }

  const setDefaultPosition = () => {
    let translateInPx
    const container = document.querySelector('.editor-container') as HTMLElement

    if (!elementRef.current || !container) return

    if (type === 'badge') {
      let badgePxSize: { width: number; height: number }

      if (width && height) {
        badgePxSize = getEditorBadgePxSize(container, width ?? 0, height ?? 0)

        setBadgeSize({
          width: badgePxSize.width,
          height: badgePxSize.height
        })
        setBadgeSizePercent({
          width: width ?? 0,
          height: height ?? 0
        })
      } else {
        const badgeBounding = document
          .querySelector('.editor-container [data-badgeid="' + badge_id + '"]')
          ?.getBoundingClientRect()

        badgePxSize = {
          width: badgeBounding?.width ?? 0,
          height: badgeBounding?.height ?? 0
        }

        setBadgeSize({
          width: badgePxSize.width,
          height: badgePxSize.height
        })

        const badgePercentSize = getEditorBadgePercentSize(
          container,
          badgePxSize.width,
          badgePxSize.height
        )

        setBadgeSizePercent({
          width: badgePercentSize.width,
          height: badgePercentSize.height
        })
      }

      setBadgeAspect(badgePxSize.width / badgePxSize.height)

      translateInPx = getEditorElementPositionInPx(
        badgePxSize.width,
        badgePxSize.height,
        translateX ?? 0,
        translateY ?? 0
      )
    } else {
      const elBounding = elementRef.current.getBoundingClientRect()
      translateInPx = getEditorElementPositionInPx(
        elBounding.width,
        elBounding.height,
        translateX ?? 0,
        translateY ?? 0
      )
    }

    setTranslate({ x: translateInPx.translateX, y: translateInPx.translateY })
    setTranslatePercent({ x: translateX ?? 0, y: translateY ?? 0 })
    setIsPosSetted(true)
  }

  const onStopHandler = (e: DraggableEvent, data: DraggableData) => {
    if (e.ctrlKey) return
    setTranslate({
      x: data.x,
      y: data.y
    })
    if (!elementRef.current) return
    const position = getEditorElementPosition(elementRef.current)
    setTranslatePercent({
      x: position.translateX,
      y: position.translateY
    })
  }

  const recalculatePosition = () => {
    let position

    if (type === 'badge') {
      const badgeSizeInPx = recalculateBadgePxSize()
      position = getEditorElementPositionInPx(
        badgeSizeInPx?.width ?? 0,
        badgeSizeInPx?.height ?? 0,
        translatePercent.x,
        translatePercent.y
      )
    } else {
      if (!elementRef.current) return
      const elBounding = elementRef.current.getBoundingClientRect()
      position = getEditorElementPositionInPx(
        elBounding.width,
        elBounding.height,
        translatePercent.x,
        translatePercent.y
      )
    }

    setTranslate({
      x: position.translateX,
      y: position.translateY
    })
  }

  const recalculateBadgePercentSize = (width: number, height: number) => {
    const container = document.querySelector('.editor-container') as HTMLElement
    if (!elementRef.current) return
    const badgeSizeInPercent = getEditorBadgePercentSize(container, width, height)
    setBadgeSizePercent({
      width: badgeSizeInPercent.width,
      height: badgeSizeInPercent.height
    })
  }

  const recalculateBadgePxSize = (): {
    width: number
    height: number
  } | null => {
    const container = document.querySelector('.editor-container') as HTMLElement
    if (!elementRef.current) return null

    const badgeSizeInPx = getEditorBadgePxSize(
      container,
      badgeSizePercent.width,
      badgeSizePercent.height
    )
    setBadgeSize({
      width: badgeSizeInPx.width,
      height: badgeSizeInPx.height
    })

    return badgeSizeInPx
  }

  const recalculateTranslation = () => {
    const badge = document.querySelector(
      '.editor-container [data-badgeid="' + badge_id + '"]'
    ) as HTMLElement
    const badgeBounding = badge?.getBoundingClientRect()
    if (!badge || !badgeBounding) return

    const translatePercent = getEditorElementPosition(badge)
    const translatePx = getEditorElementPositionInPx(
      badgeBounding.width,
      badgeBounding.height,
      translatePercent.translateX,
      translatePercent.translateY
    )

    setTranslate({
      x: translatePx.translateX,
      y: translatePx.translateY
    })
    setTranslatePercent({
      x: translatePercent.translateX,
      y: translatePercent.translateY
    })
  }

  useScreenObserver(
    () => {
      if (isActiveEditor) {
        recalculatePosition()
      }
    },
    [isActiveEditor, translatePercent, badgeSizePercent],
    true
  )

  useLayoutEffect(() => {
    if (isActiveEditor && !isPosSetted) {
      setDefaultPosition()
    } else {
      recalculatePosition()
    }
  }, [isActiveEditor, isPosSetted])

  useLayoutEffect(() => {
    if (isActiveEditor && isPosSetted) {
      setDefaultPosition()
    }
  }, [isCancelEdit, translateX, translateY, width, height])

  return (
    <Draggable
      axis='both'
      handle='.handle'
      position={translate}
      scale={1}
      bounds='parent'
      onStop={(e, data) => onStopHandler(e, data)}
      onStart={() => setIsUnsaved(true)}
    >
      <div
        ref={elementRef}
        data-elementtype={type}
        data-badgeid={badge_id}
        data-widgettype={widgetType}
        className={`absolute inline-block ` + (!!className ? className : '')}
        style={{ zIndex: zIndex }}
      >
        {type === 'widget' ? (
          element
        ) : (
          <Resizable
            maxWidth={containerSize.width}
            maxHeight={containerSize.height}
            minWidth={100}
            minHeight={badgeAspect ? 100 / badgeAspect : 100}
            resizeRatio={badgeAspect ? badgeAspect : 1}
            bounds={document.querySelector('.editor-container') as HTMLElement}
            size={!!badgeSize ? badgeSize : undefined}
            onResizeStop={(e, __, ___, d) => {
              if (e.ctrlKey) return
              if (!badgeSize) return

              setBadgeSize({
                width: badgeSize.width + d.width,
                height: badgeSize.height + d.height
              })
              recalculateBadgePercentSize(badgeSize.width + d.width, badgeSize.height + d.height)
              recalculateTranslation()
            }}
            onResizeStart={() => setIsUnsaved(true)}
            lockAspectRatio
            className={`outline outline-transparent ${
              colorVariantsHover.outline[roomAppearance.active_room_color]
            } flex items-center justify-center outline-4 transition-colors`}
          >
            <div className='handle flex h-full w-full items-center justify-center'>
              <img
                className='pointer-events-none h-full w-full object-contain'
                src={`/${badge_img}`}
                alt='badge'
              />
            </div>
          </Resizable>
        )}
        <EditorElementCross onClick={handleRemove} />
      </div>
    </Draggable>
  )
}

export default EditorElement
