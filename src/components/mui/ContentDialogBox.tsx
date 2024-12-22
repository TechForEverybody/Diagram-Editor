import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import getTransition from './common/DialogTransitions'

type Props = {
    isOpen: boolean
    onClose: () => void
    isTransition?: boolean
    transitionDirection?: 'left' | 'right' | 'up' | 'down'
    title?: React.ReactNode
    actions?: React.ReactNode
    content?: React.ReactNode
    fullScreen?: boolean
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
    paperStyle?: React.CSSProperties
    contentStyle?: React.CSSProperties
    backdropStyle?: React.CSSProperties
}

function ContentDialogBox({
    isOpen,
    onClose,
    isTransition = false,
    transitionDirection = 'down',
    title,
    actions,
    content,
    fullScreen = false,
    maxWidth = 'md',
    paperStyle,
    contentStyle,
    backdropStyle,
}: Props) {
    return (
        <div>
            <Dialog
                open={isOpen}
                TransitionComponent={
                    isTransition
                        ? getTransition(transitionDirection)
                        : undefined
                }
                keepMounted
                onClose={onClose}
                fullScreen={fullScreen}
                maxWidth={maxWidth}
                fullWidth
                scroll="paper"
                PaperProps={{
                    style: paperStyle,
                }}
                BackdropProps={{
                    style: backdropStyle,
                }}
            >
                {title && <DialogTitle fontSize={'20px'}>{title}</DialogTitle>}
                {content && (
                    <DialogContent
                        sx={{
                            maxHeight: '100vh',
                            ...contentStyle,
                        }}
                    >
                        {content}
                    </DialogContent>
                )}
                {actions && <DialogActions>{actions}</DialogActions>}
            </Dialog>
        </div>
    )
}

export default ContentDialogBox
