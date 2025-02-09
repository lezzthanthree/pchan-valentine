interface WindowProps {
    title: string;
    children?: React.ReactNode;
}

export const Window = (prop: WindowProps) => {
    const { title, children } = prop;

    return (
        <div className="window__background">
            <div className="window__title_bar">
                <div className="window__title_icon" />
                {title}
            </div>
            <div className="window__foreground">{children}</div>
            <div className="window__bottom">
                <div className="window__long_pink_thingy" />
                <div className="window__small_square_thingy" />
                <div className="window__small_square_thingy" />
                <div className="window__small_square_thingy" />
            </div>
        </div>
    );
};
