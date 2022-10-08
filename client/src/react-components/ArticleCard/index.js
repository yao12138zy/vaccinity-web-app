import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import image0 from './static/1.jpg';
import image2 from './static/2.jpg';
import image3 from './static/3.jpg';
import image4 from './static/4.jpg';
import image1 from './static/5.jpg';
import image5 from './static/6.jpg';
import image6 from './static/7.jpg';
import image7 from './static/8.jpg';
import image8 from './static/9.jpg';
import image9 from './static/10.jpg';
import image10 from './static/11.jpg';
import image11 from './static/12.jpg';
import image12 from './static/13.jpg';
import image13 from './static/14.jpg';
import image14 from './static/15.jpg';
import image15 from './static/15.jpg';
import image16 from './static/16.jpg';
import image17 from './static/16.jpg';
import image18 from './static/16.jpg';
import image19 from './static/16.jpg';
import image20 from './static/16.jpg';
import "./styles.css";


const styles = {
    root: {
        width: "260px",
    },
};

function ArticleCard(props){

    const {classes} = props;

    const {
        home,
        article,
        isAdmin,
      } = props;

    const images = []
    images.push(image0);
    images.push(image1);
    images.push(image2);
    images.push(image3);
    images.push(image4);
    images.push(image5);
    images.push(image6);
    images.push(image7);
    images.push(image8);
    images.push(image9);
    images.push(image10);
    images.push(image11);
    images.push(image12);
    images.push(image13);
    images.push(image14);
    images.push(image15);
    images.push(image16);
    images.push(image17);
    images.push(image18);
    images.push(image19);
    images.push(image20);

    const image = images[Math.floor(Math.random() * images.length)]

    return (

        <Card className={classes.root}> 
            <CardActionArea>
            <Link to={{pathname:'\ArticlePage', article: article, isAdmin: isAdmin, home: home}} className= "cardclick">
                <CardMedia
                className="cardmedia"
                image={image}
                title= "image title"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {article.title1}
                </Typography>
                <Typography variant="body2" color="textSecondary" className="p">
                    {article.content1}
                </Typography>
                </CardContent>
            </Link>
            </CardActionArea>
            <CardActions >
            <Link to={{pathname:'\ArticlePage', article: article, isAdmin: isAdmin, home: home}}
                 className="link_button">
                <Button variant="outlined" size="small" color="primary">
                    More Information
                </Button>
            </Link>
            </CardActions>
        </Card>

        );
}

export default withStyles(styles)(ArticleCard);