import React, { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardBody,
    CardHeader,
    Loader,
} from '@strapi/design-system';

const Analytics = () => {
    const { get } = useFetchClient();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await get('/analytics/dashboard');
                setData(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch analytics:', err);
                setError('Failed to load analytics data');
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [get]);

    if (loading) {
        return (
            <Box padding={8} background="neutral100">
                <Loader>Loading analytics...</Loader>
            </Box>
        );
    }

    if (error) {
        return (
            <Box padding={8} background="neutral100">
                <Typography variant="omega" textColor="danger600">
                    {error}
                </Typography>
            </Box>
        );
    }

    const { revenue, subscribers, content } = data || {};

    return (
        <Box padding={8} background="neutral100">
            <Box marginBottom={4}>
                <Typography variant="alpha">📊 Analytics Dashboard</Typography>
                <Typography variant="omega" textColor="neutral600">
                    Business metrics and insights
                </Typography>
            </Box>

            {/* Revenue Section */}
            <Box marginBottom={6}>
                <Typography variant="beta" marginBottom={3}>
                    💰 Revenue Metrics
                </Typography>
                <Grid gridCols={4} gap={4}>
                    <Card>
                        <CardHeader>
                            <Typography variant="sigma" textColor="neutral600">
                                MRR
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="alpha">${revenue?.mrr || 0}</Typography>
                            <Typography variant="pi" textColor="neutral600">
                                Monthly Recurring
                            </Typography>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Typography variant="sigma" textColor="neutral600">
                                ARR
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="alpha">${revenue?.arr || 0}</Typography>
                            <Typography variant="pi" textColor="neutral600">
                                Annual Recurring
                            </Typography>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Typography variant="sigma" textColor="neutral600">
                                Premium Revenue
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="alpha">${revenue?.premiumRevenue || 0}</Typography>
                            <Typography variant="pi" textColor="neutral600">
                                From Premium tier
                            </Typography>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Typography variant="sigma" textColor="neutral600">
                                VIP Revenue
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="alpha">${revenue?.vipRevenue || 0}</Typography>
                            <Typography variant="pi" textColor="neutral600">
                                From Chef's Circle
                            </Typography>
                        </CardBody>
                    </Card>
                </Grid>
            </Box>

            {/* Subscribers Section */}
            <Box marginBottom={6}>
                <Typography variant="beta" marginBottom={3}>
                    👥 Subscriber Metrics
                </Typography>
                <Grid gridCols={4} gap={4}>
                    <Card>
                        <CardHeader>
                            <Typography variant="sigma" textColor="neutral600">
                                Total Users
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="alpha">{subscribers?.totalUsers || 0}</Typography>
                            <Typography variant="pi" textColor="success600">
                                +{subscribers?.newSignupsThisWeek || 0} this week
                            </Typography>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Typography variant="sigma" textColor="neutral600">
                                Free Users
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="alpha">{subscribers?.freeUsers || 0}</Typography>
                            <Typography variant="pi" textColor="neutral600">
                                Tier 0
                            </Typography>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Typography variant="sigma" textColor="neutral600">
                                Premium Members
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="alpha">{subscribers?.premiumUsers || 0}</Typography>
                            <Typography variant="pi" textColor="neutral600">
                                $7.99/mo
                            </Typography>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Typography variant="sigma" textColor="neutral600">
                                Chef's Circle
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="alpha">{subscribers?.vipUsers || 0}</Typography>
                            <Typography variant="pi" textColor="neutral600">
                                $14.99/mo
                            </Typography>
                        </CardBody>
                    </Card>
                </Grid>

                <Box marginTop={4}>
                    <Grid gridCols={3} gap={4}>
                        <Card>
                            <CardBody>
                                <Typography variant="pi" textColor="neutral600">
                                    Churn Rate
                                </Typography>
                                <Typography variant="beta">{subscribers?.churnRate || '0%'}</Typography>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <Typography variant="pi" textColor="neutral600">
                                    New Subscriptions (This Month)
                                </Typography>
                                <Typography variant="beta">{subscribers?.newSubscriptionsThisMonth || 0}</Typography>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <Typography variant="pi" textColor="neutral600">
                                    Active Subscriptions
                                </Typography>
                                <Typography variant="beta">{subscribers?.activeSubscriptions || 0}</Typography>
                            </CardBody>
                        </Card>
                    </Grid>
                </Box>
            </Box>

            {/* Content Section */}
            <Box marginBottom={6}>
                <Typography variant="beta" marginBottom={3}>
                    📖 Content Metrics
                </Typography>
                <Grid gridCols={3} gap={4}>
                    <Card>
                        <CardHeader>
                            <Typography variant="sigma" textColor="neutral600">
                                Total Recipes
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="alpha">{content?.totalRecipes || 0}</Typography>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Typography variant="sigma" textColor="neutral600">
                                Free Recipes
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="alpha">{content?.freeRecipes || 0}</Typography>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Typography variant="sigma" textColor="neutral600">
                                Premium Recipes
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="alpha">{content?.premiumRecipes || 0}</Typography>
                        </CardBody>
                    </Card>
                </Grid>
            </Box>

            {/* Top Recipes */}
            <Box>
                <Typography variant="beta" marginBottom={3}>
                    🔥 Top 10 Most Viewed Recipes
                </Typography>
                <Card>
                    <CardBody>
                        {content?.topRecipes && content.topRecipes.length > 0 ? (
                            <Box>
                                {content.topRecipes.map((recipe, index) => (
                                    <Box
                                        key={recipe.slug}
                                        padding={3}
                                        background={index % 2 === 0 ? 'neutral0' : 'neutral100'}
                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                    >
                                        <Typography>
                                            {index + 1}. {recipe.title}
                                        </Typography>
                                        <Typography variant="pi" textColor="neutral600">
                                            👁️ {recipe.views} views
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <Typography textColor="neutral600">No recipe views yet</Typography>
                        )}
                    </CardBody>
                </Card>
            </Box>
        </Box>
    );
};

export default Analytics;
