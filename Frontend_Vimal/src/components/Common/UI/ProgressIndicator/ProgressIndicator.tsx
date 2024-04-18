type ProgressIndicatorProps = {
    className?: string;
}

const ProgressIndicator = (props: ProgressIndicatorProps) => {
    return (
        <div className={props.className || 'progress-indicator'}>
            <div className='loader' />
        </div>
    );
}

export default ProgressIndicator;
